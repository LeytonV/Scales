using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Model;

namespace Server.Data
{
	public class DataContext : IdentityDbContext<MyUser, MyRole, int>
	{
		public required DbSet<WeightRecord> WeightRecords { get; init; }
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
		
		}
	}
}
