using HomeAz.Api.Application.Interfaces.AutoMapper;
using HomeAz.Api.Application.Interfaces.UnitOfWorks;
using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Queries.GetAllProperties
{
    public class GetAllPropertiesQueryHandler : IRequestHandler<GetAllPropertiesQueryRequest, IList<GetAllPropertiesQueryResponse>>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public GetAllPropertiesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<IList<GetAllPropertiesQueryResponse>> Handle(GetAllPropertiesQueryRequest request, CancellationToken cancellationToken)
        {
            IList<Property> properties = new List<Property>();
            if (request.currentPage > 0 && request.pageSize > 0)
                properties = await unitOfWork.GetReadRepository<Property>().GetAllByPagingAsync(request.predicate, request.orderBy, request.currentPage, request.pageSize);
            else
                properties = await unitOfWork.GetReadRepository<Property>().GetAllAsync(request.predicate, request.orderBy);

            var response = mapper.Map<GetAllPropertiesQueryResponse, Property>(properties);

            foreach (var property in response)
            {
                if (property.Status == "True")
                    property.Status = "For Sale";
                else
                    property.Status = "For Rent";
            }

            return response;
        }
    }
}
