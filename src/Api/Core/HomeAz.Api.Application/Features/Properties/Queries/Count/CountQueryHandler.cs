using HomeAz.Api.Application.Interfaces.UnitOfWorks;
using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.Count
{
    public class CountQueryHandler : IRequestHandler<CountQueryRequest, CountQueryResponse>
    {
        private readonly IUnitOfWork unitOfWork;

        public CountQueryHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<CountQueryResponse> Handle(CountQueryRequest request, CancellationToken cancellationToken)
        {
            var count = await unitOfWork.GetReadRepository<Property>().CountAsync(request.predicate);

            var response = new CountQueryResponse(count);

            return response;
        }
    }
}
