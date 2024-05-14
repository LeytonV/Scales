using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Model
{
	public class WeightRecord
	{
		public int Id { get; set; }

		/// <summary>
		/// The user this weight record belongs to.
		/// </summary>
		public MyUser User { get; set; } = null!;

		/// <summary>
		/// The ID of the user this weight record belongs to.
		/// </summary>
		public int UserId { get; set; }

		/// <summary>
		/// The reported weight, in pounds. Converted to the user's preferred weight on display
		/// </summary>
		public required float WeightInPounds { get; set; }

		/// <summary>
		/// The recorded date of this weight record.
		/// </summary>
		public required DateOnly Date { get; set; }


		
	}
}
