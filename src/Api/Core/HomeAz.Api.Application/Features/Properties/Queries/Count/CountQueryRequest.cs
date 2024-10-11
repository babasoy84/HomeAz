using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.Count
{
    public class CountQueryRequest : IRequest<CountQueryResponse>
    {
        public Expression<Func<Property, bool>> predicate { get; set; } = p => true;
    }
}
