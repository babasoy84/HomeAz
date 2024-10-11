using HomeAz.Api.Application.Interfaces.AutoMapper;
using HomeAz.Api.Application.Interfaces.UnitOfWorks;
using HomeAz.Api.Domain.Concretes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Application.Features.Properties.Commands.UpdatePropert
{
    public class UpdatePropertyCommandHandler : IRequestHandler<UpdatePropertyCommandRequest>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public UpdatePropertyCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task Handle(UpdatePropertyCommandRequest request, CancellationToken cancellationToken)
        {
            var property = mapper.Map<Property, UpdatePropertyCommandRequest>(request);

            await unitOfWork.GetWriteRepository<Property>().UpdateAsync(property);

            await unitOfWork.SaveAsync();
        }
    }
}
