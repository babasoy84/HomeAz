using HomeAz.Api.Application.Interfaces.RedisCache;
using HomeAz.Api.Infrastructure.RedisCache;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Infrastructure
{
    public static class Registration
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<RedisCacheSettings>(options =>
            configuration.GetSection("RedisCacheSettings").Bind(options));

            services.AddTransient<IRedisCacheService, RedisCacheService>();

            services.AddStackExchangeRedisCache(opt =>
            {
                opt.Configuration = configuration["RedisCacheSettings:ConnectionString"];
                opt.InstanceName = configuration["RedisCacheSettings:InstanceName"];
            });
        }
    }
}
