using Microsoft.AspNetCore.Identity;

namespace Server.Model
{
	public class MyUser : IdentityUser<int>
	{
		/// <summary>
		/// The user's preferred weight unit.
		/// </summary>
		public int PreferredWeightUnit { get; set; }

		public ICollection<WeightRecord> WeightRecords { get; set; } = new List<WeightRecord>();
	}
}
