using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.Count
{
    public class CountQueryResponse
    {
        public int Count { get; set; }

        public CountQueryResponse() { }

        public CountQueryResponse(int count)
        {
            Count = count;
        }
    }
}
