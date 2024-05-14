namespace Server.Model
{
	public class WeightRecordUpdateDto
	{
		public float WeightInPounds {  get; set; }
		public DateOnly Date { get; set; }

		public WeightRecordUpdateDto(WeightRecord record)
		{
			this.WeightInPounds = record.WeightInPounds;
			this.Date = record.Date;
		}
	}
}
