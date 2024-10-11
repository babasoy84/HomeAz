using HomeAz.Api.Application.Interfaces.RedisCache;
using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.GetAllProperties
{
    public class GetAllPropertiesQueryRequest : IRequest<IList<GetAllPropertiesQueryResponse>>, ICacheableQuery
    {
        public Expression<Func<Property, bool>> predicate { get; set; } = p => true;

        public Func<IQueryable<Property>, IOrderedQueryable<Property>>? orderBy { get; set; } = null;

        public int currentPage { get; set; } = 0;

        public int pageSize { get; set; } = 0;

        public double CacheTime { get; set; } = 5;

        public string CacheKey { get; set; }
    }
}
