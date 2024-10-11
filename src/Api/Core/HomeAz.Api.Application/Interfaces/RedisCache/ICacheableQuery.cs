using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Interfaces.RedisCache
{
    public interface ICacheableQuery
    {
        string CacheKey { get; set; }
        double CacheTime { get; set; }
    }
}
