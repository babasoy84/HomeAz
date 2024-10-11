# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Api/Presentation/HomeAz.Api.WebApi/HomeAz.Api.WebApi.csproj", "src/Api/Presentation/HomeAz.Api.WebApi/"]
COPY ["src/Api/Core/HomeAz.Api.Application/HomeAz.Api.Application.csproj", "src/Api/Core/HomeAz.Api.Application/"]
COPY ["src/Common/HomeAz.Common/HomeAz.Common.csproj", "src/Common/HomeAz.Common/"]
COPY ["src/Api/Core/HomeAz.Api.Domain/HomeAz.Api.Domain.csproj", "src/Api/Core/HomeAz.Api.Domain/"]
COPY ["src/Api/Core/HomeAz.Api.Mapper/HomeAz.Api.Mapper.csproj", "src/Api/Core/HomeAz.Api.Mapper/"]
COPY ["src/Api/Infrastructure/HomeAz.Api.Infrastructure/HomeAz.Api.Infrastructure.csproj", "src/Api/Infrastructure/HomeAz.Api.Infrastructure/"]
COPY ["src/Api/Infrastructure/HomeAz.Api.Persistence/HomeAz.Api.Persistence.csproj", "src/Api/Infrastructure/HomeAz.Api.Persistence/"]
RUN dotnet restore "./src/Api/Presentation/HomeAz.Api.WebApi/HomeAz.Api.WebApi.csproj"
COPY . .
WORKDIR "/src/src/Api/Presentation/HomeAz.Api.WebApi"
RUN dotnet build "./HomeAz.Api.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./HomeAz.Api.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HomeAz.Api.WebApi.dll"]