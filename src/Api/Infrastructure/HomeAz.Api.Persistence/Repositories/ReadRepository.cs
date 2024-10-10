using HomeAz.Api.Application.Interfaces.Repositories;
using HomeAz.Api.Domain.Abstracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HomeAz.Api.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : class, IEntityBase, new()
    {
        private readonly DbContext dbContext;

        private DbSet<T> Table { get => dbContext.Set<T>(); }

        public ReadRepository(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IList<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null)
        {
            IQueryable<T> queryable = Table;

            if (predicate != null) queryable = queryable.Where(predicate);

            if (orderBy != null) return await orderBy(queryable).ToListAsync();

            return await queryable.ToListAsync();
        }

        public async Task<IList<T>> GetAllByPagingAsync(Expression<Func<T, bool>>? predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, int currentPage = 1, int pageSize = 3)
        {
            IQueryable<T> queryable = Table;

            if (predicate != null) queryable = queryable.Where(predicate);

            if (orderBy != null) return await orderBy(queryable).Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();

            return await queryable.Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate) => await Table.FirstOrDefaultAsync(predicate);

        public async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null) => await Table.CountAsync(predicate);
    }
}
