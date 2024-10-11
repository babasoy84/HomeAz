using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HomeAz.Common;
using HomeAz.Common.Infrastructure;
using System.Security.Principal;

namespace HomeAz.Projections.UploadImageService
{

    internal class ImageInfo
    {
        public string PublicId { get; set; }
        public byte[] ImageData { get; set; }
    }

    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly Cloudinary cloudinary;

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
            var account = new Account(HomeAzConstants.cloudName, HomeAzConstants.apiKey, HomeAzConstants.apiSecret
    );
            cloudinary = new Cloudinary(account);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            QueueFactory.CreateBasicConsumer()
                .EnsureExchange(HomeAzConstants.ImageExchangeName)
                .EnsureQueue(HomeAzConstants.UploadImageQueueName, HomeAzConstants.ImageExchangeName)
                .Receive<ImageInfo>(async (message) =>
                {
                    string publicId = message.PublicId;
                    byte[] imageData = message.ImageData;

                    await UploadImageToCloudinary(publicId, imageData);
                })
                .StartConsuming(HomeAzConstants.UploadImageQueueName);
        }

        private async Task UploadImageToCloudinary(string publicId, byte[] imageData)
        {
            using (var imageStream = new MemoryStream(imageData))
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(publicId, imageStream),
                    PublicId = publicId
                };

                var uploadResult = cloudinary.Upload(uploadParams);
            }
        }
    }
}
