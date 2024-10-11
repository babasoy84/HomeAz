using HomeAz.Api.Application.Interfaces.AutoMapper;
using HomeAz.Api.Application.Interfaces.UnitOfWorks;
using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.GetProperty
{
    public class GetPropertyQueryHandler : IRequestHandler<GetPropertyQueryRequest, GetPropertyQueryResponse>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public GetPropertyQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<GetPropertyQueryResponse> Handle(GetPropertyQueryRequest request, CancellationToken cancellationToken)
        {
            var property = await unitOfWork.GetReadRepository<Property>().GetAsync(request.predicate);

            var response = mapper.Map<GetPropertyQueryResponse, Property>(property);

            return response;
        }
    }
}
