using HomeAz.Api.Application.Interfaces.UnitOfWorks;
using HomeAz.Api.Domain.Concretes;
using HomeAz.Common;
using HomeAz.Common.Infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Commands.CreateProperty
{
    public class CreatePropertyCommandHandler : IRequestHandler<CreatePropertyCommandRequest>
    {
        private readonly IUnitOfWork unitOfWork;

        public CreatePropertyCommandHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task Handle(CreatePropertyCommandRequest request, CancellationToken cancellationToken)
        {
            Property property = new(request.Status, request.Type, request.Description, request.Address, request.Price, request.NumberOfBathrooms, request.NumberOfBedrooms, request.SquareMeters);

            var imagePublicIds = new List<string>();
            var imageUrls = new List<string>();

            foreach (var image in request.Images)
            {
                var publicId = Guid.NewGuid().ToString();
                imagePublicIds.Add(publicId);


                var imageUrl = $"https://res.cloudinary.com/dv9hubcxy/image/upload/{publicId}.jpg";
                imageUrls.Add(imageUrl);
            }

            property.ImageUrls = imageUrls;


            await unitOfWork.GetWriteRepository<Property>().AddAsync(property);

            await unitOfWork.SaveAsync();

            foreach (var image in request.Images)
            {
                var imageStream = image.OpenReadStream();
                var imageBytes = new byte[imageStream.Length];

                await imageStream.ReadAsync(imageBytes, 0, (int)imageStream.Length);
                QueueFactory.SendMessageToExchange(exchangeName: HomeAzConstants.ImageExchangeName,
                                                   exchangeType: HomeAzConstants.DefaultExchangeType,
                                                   queueName: HomeAzConstants.UploadImageQueueName,
                                                   obj: new
                                                   {
                                                       PublicId = imagePublicIds[request.Images.IndexOf(image)],
                                                       ImageData = imageBytes
                                                   });
            }
        }
    }
}
