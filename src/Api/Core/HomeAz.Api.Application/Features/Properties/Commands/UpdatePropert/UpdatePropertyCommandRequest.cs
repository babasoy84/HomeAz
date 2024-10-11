using HomeAz.Api.Domain.Abstracts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Commands.UpdatePropert
{
    public class UpdatePropertyCommandRequest : IRequest
    {
        public List<string> ImageUrls { get; set; }
        public bool Status { get; set; }
        public PropertyTypes Type { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public float Price { get; set; }
        public short NumberOfBathrooms { get; set; }
        public short NumberOfBedrooms { get; set; }
        public float SquareMeters { get; set; }
    }
}
