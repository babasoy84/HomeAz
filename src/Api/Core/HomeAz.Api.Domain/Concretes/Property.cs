using HomeAz.Api.Domain.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Domain.Concretes
{
    public class Property : EntityBase
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

        public Property()
        {

        }

        public Property(bool status, PropertyTypes type, string description, string address, float price, short numberOfBathrooms, short numberOfBedrooms, float squareMeters)
        {
            Status = status;
            Type = type;
            Description = description;
            Address = address;
            Price = price;
            NumberOfBathrooms = numberOfBathrooms;
            NumberOfBedrooms = numberOfBedrooms;
            SquareMeters = squareMeters;
        }
    }
}
