using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.GetProperty
{
    public class GetPropertyQueryRequest : IRequest<GetPropertyQueryResponse>
    {
        public Expression<Func<Property, bool>> predicate { get; set; }

        public GetPropertyQueryRequest(Expression<Func<Property, bool>> predicate)
        {
            this.predicate = predicate;
        }
    }
}
