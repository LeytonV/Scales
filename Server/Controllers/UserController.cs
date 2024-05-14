using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Model;

namespace Server.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserManager<MyUser> _userManager;
		private readonly DataContext _context;

		public UserController(UserManager<MyUser> userManager, DataContext context)
		{
			_userManager = userManager;
			_context = context;
		}

		/// <summary>
		/// Gets the user's information
		/// </summary>
		/// <param name="weightInPounds"></param>
		/// <param name="date"></param>
		/// <returns></returns>
		[HttpGet("GetUserData")]
		public async Task<UserBasicDto> GetUserData()
		{
			MyUser user = await _userManager.GetUserAsync(HttpContext.User);

			return new UserBasicDto(user);
		}

		/// <summary>
		/// Gets the user's information
		/// </summary>
		/// <param name="weightInPounds"></param>
		/// <param name="date"></param>
		/// <returns>A copy of the user, if succeeded</returns>
		[HttpPost("UpdateUser")]
		public async Task<UserBasicDto> UpdateUser([FromBody]UserUpdateDto updateDto)
		{
			MyUser user = await _userManager.GetUserAsync(HttpContext.User);

			user.Email = updateDto.Email;
			user.PreferredWeightUnit = updateDto.PreferredWeightUnit;

			_context.SaveChanges();
			return new UserBasicDto(user);
		}

	}
}
