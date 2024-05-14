using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Model;

namespace Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UserWeightController : ControllerBase
	{

		private readonly UserManager<MyUser> _userManager;
		private readonly DataContext _context;

		public UserWeightController(UserManager<MyUser> userManager, DataContext context)
		{
			_userManager = userManager;
			_context = context;
		}

		/// <summary>
		/// Adds a weight record to the user.
		/// </summary>
		/// <param name="weightInPounds"></param>
		/// <param name="date"></param>
		/// <returns></returns>
		[HttpPost("AddWeightRecord")]
		[Authorize]
		public async Task<WeightRecordDto> AddWeightRecord([FromBody]WeightRecordCreateDto weightData)
		{
			MyUser user = await _userManager.GetUserAsync(HttpContext.User);

			WeightRecord newRecord = new WeightRecord
			{
				User = user,
				WeightInPounds = weightData.WeightInPounds,
				Date = weightData.Date
			};

			_context.WeightRecords.Add(newRecord);
			_context.SaveChanges();
			return new WeightRecordDto(newRecord);
		}

		/// <summary>
		/// Gets weights between two datetimes
		/// </summary>
		/// <param name="start"></param>
		/// <param name="end"></param>
		/// <returns></returns>
		[HttpGet("GetWeights")]
		[Authorize]
		public async Task<IEnumerable<WeightRecordDto>> GetWeightRecords([FromQuery(Name = "from")]DateOnly start, [FromQuery(Name = "to")]DateOnly end)
		{
			MyUser user = await _userManager.GetUserAsync(HttpContext.User);

			WeightRecord[] records = _context.WeightRecords.Where(x => x.UserId == user.Id && x.Date > start && x.Date < end)
										.OrderBy(x => x.Date).ToArray();

			return Array.ConvertAll(records, x => new WeightRecordDto(x));
		}

		/// <summary>
		/// Gets all weights on the user
		/// </summary>
		/// <returns></returns>

		[HttpGet("GetAllWeights")]
		[Authorize]
		public async Task<IEnumerable<WeightRecordDto>> GetAllWeights()
		{
			MyUser user = await _userManager.GetUserAsync(HttpContext.User);

			WeightRecord[] records = _context.WeightRecords.Where(x => x.UserId == user.Id)
										.OrderBy(x => x.Date).ToArray();

			return Array.ConvertAll(records, x => new WeightRecordDto(x));
		}
	}
}
