using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using QuanLyHieuSuat.DTO;
using QuanLyHieuSuat.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using QuanLyHieuSuat.Helpers;
using Microsoft.EntityFrameworkCore;

namespace QuanLyHieuSuat.Services
{

    public interface IUserService
    {
        AuthenticateResponse Authenticate(LoginDTO model);
        IEnumerable<Vienchuc> GetAll();
        Vienchuc GetById(string id);
    }

    public class UserService : IUserService
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications


        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(LoginDTO model)
        {
            var user = db.Vienchuc.SingleOrDefault(x => x.Mail.Trim() == model.Username && x.Matkhau.Trim() == model.Password);

            // return null if user not found
            if (user == null) return null;
            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<Vienchuc> GetAll()
        {

            return db.Vienchuc.ToList();
        }

        public Vienchuc GetById(string id)
        {
            return db.Vienchuc.FirstOrDefault(x => x.Mavienchuc == id);
        }

        // helper methods

        private string generateJwtToken(Vienchuc user)
        {
            // generate token that is valid for 1 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("mavienchuc", user.Mavienchuc.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}
