using HomeAz.Api.Application.Features.Properties.Commands.CreateProperty;
using HomeAz.Api.Application.Features.Properties.Queries.Count;
using HomeAz.Api.Application.Features.Properties.Queries.GetAllProperties;
using HomeAz.Api.Application.Utilities;
using HomeAz.Api.Domain.Abstracts;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeAz.Api.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public PropertiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] bool? status,
        [FromQuery] string? type,
        [FromQuery] float? minPrice,
        [FromQuery] float? maxPrice,
        [FromQuery] float? minSquareMeters,
        [FromQuery] float? maxSquareMeters,
        [FromQuery] short? numberOfBedrooms,
        [FromQuery] short? numberOfBathrooms,
        [FromQuery] int currentPage = 1,
        [FromQuery] int pageSize = 10
    )
        {
            var key = $"GetAllProperties&currentPage={currentPage}$pageSize={pageSize}";

            var request = new GetAllPropertiesQueryRequest
            {
                currentPage = currentPage,
                pageSize = pageSize
            };

            if (status.HasValue)
            {
                request.predicate = request.predicate.And(p => p.Status == status.Value);
                key += $"$status={status}";
            }

            if (!string.IsNullOrEmpty(type))
            {
                if (Enum.TryParse(type, out PropertyTypes parsedType))
                {
                    request.predicate = request.predicate.And(p => p.Type == parsedType);
                    key += $"type={type}";
                }
            }

            if (minSquareMeters.HasValue)
            {
                request.predicate = request.predicate.And(p => p.SquareMeters >= minSquareMeters.Value);
                key += $"$minSquareMeters={minSquareMeters}";
            }

            if (maxSquareMeters.HasValue)
            {
                request.predicate = request.predicate.And(p => p.SquareMeters <= maxSquareMeters.Value);
                key += $"$maxSquareMeters={maxSquareMeters}";
            }

            if (minPrice.HasValue)
            {
                request.predicate = request.predicate.And(p => p.Price >= minPrice.Value);
                key += $"$minPrice={minPrice}";
            }

            if (maxPrice.HasValue)
            {
                request.predicate = request.predicate.And(p => p.Price <= maxPrice.Value);
                key += $"$maxPrice={maxPrice}";
            }

            if (numberOfBedrooms.HasValue)
            {
                request.predicate = request.predicate.And(p => p.NumberOfBedrooms == numberOfBedrooms.Value);
                key += $"numberOfBedrooms={numberOfBedrooms}";
            }

            if (numberOfBathrooms.HasValue)
            {
                request.predicate = request.predicate.And(p => p.NumberOfBathrooms == numberOfBathrooms.Value);
                key += $"numberOfBathrooms={numberOfBathrooms}";
            }

            request.CacheKey = key;

            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Count(
        [FromQuery] bool? status,
        [FromQuery] string? type,
        [FromQuery] float? minPrice,
        [FromQuery] float? maxPrice,
        [FromQuery] float? minSquareMeters,
        [FromQuery] float? maxSquareMeters,
        [FromQuery] short? numberOfBedrooms,
        [FromQuery] short? numberOfBathrooms
    )
        {

            CountQueryRequest request = new();

            if (status.HasValue)
            {
                request.predicate = request.predicate.And(p => p.Status == status.Value);
            }

            if (!string.IsNullOrEmpty(type))
            {
                if (Enum.TryParse(type, out PropertyTypes parsedType))
                {
                    request.predicate = request.predicate.And(p => p.Type == parsedType);
                }
            }

            if (minSquareMeters.HasValue)
            {
                request.predicate = request.predicate.And(p => p.SquareMeters >= minSquareMeters.Value);
            }

            if (maxSquareMeters.HasValue)
            {
                request.predicate = request.predicate.And(p => p.SquareMeters <= maxSquareMeters.Value);
            }

            if (minPrice.HasValue)
            {
                request.predicate = request.predicate.And(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                request.predicate = request.predicate.And(p => p.Price <= maxPrice.Value);
            }

            if (numberOfBedrooms.HasValue)
            {
                request.predicate = request.predicate.And(p => p.NumberOfBedrooms == numberOfBedrooms.Value);
            }

            if (numberOfBathrooms.HasValue)
            {
                request.predicate = request.predicate.And(p => p.NumberOfBathrooms == numberOfBathrooms.Value);
            }

            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreatePropertyCommandRequest request)
        {
            await mediator.Send(request);

            return Ok(new { message = "Property created successfully!" });
        }
    }
}
