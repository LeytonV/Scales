namespace Server.Model
{
	public class WeightRecordDto
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public float WeightInPounds {  get; set; }
		public DateOnly Date { get; set; }

		public WeightRecordDto(WeightRecord record)
		{
			this.Id = record.Id;
			this.UserId = record.UserId;
			this.WeightInPounds = record.WeightInPounds;
			this.Date = record.Date;
		}
	}
}
