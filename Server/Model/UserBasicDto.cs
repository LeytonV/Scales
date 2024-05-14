namespace Server.Model
{
	public class UserBasicDto
	{

		public int Id { get; set; }
		public string Email { get; set; } = "";

		public int PreferredWeightUnit { get; set; }

		public UserBasicDto(MyUser user)
		{
			this.Id = user.Id;
			this.Email = user.Email;
			this.PreferredWeightUnit = user.PreferredWeightUnit;
		}
	}
}
