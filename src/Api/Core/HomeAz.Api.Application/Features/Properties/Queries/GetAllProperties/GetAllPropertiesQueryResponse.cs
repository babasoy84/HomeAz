using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.GetAllProperties
{
    public class GetAllPropertiesQueryResponse
    {
        public int Id { get; set; }
        public List<string> ImageUrls { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public float Price { get; set; }
        public short NumberOfBathrooms { get; set; }
        public short NumberOfBedrooms { get; set; }
        public float SquareMeters { get; set; }
    }
}
