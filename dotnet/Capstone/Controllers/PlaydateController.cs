﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Capstone.DAO;
using Capstone.Models;

namespace Capstone.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlaydateController : Controller
    {
        private readonly IPlaydateDao playdateDao;
        private readonly IUserDao userDao;

        public PlaydateController(IPlaydateDao _playdateDao, IUserDao _userDao)
        {
            playdateDao = _playdateDao;
            userDao = _userDao;

        }

        [HttpGet("userid/{id}")]
        public ActionResult<IList<PlayDate>> GetPlayDatesByUser(int id)
        {
            IList<PlayDate> playdatesToReturn = new List<PlayDate>();
            playdatesToReturn = playdateDao.GetPlayDatesByUser(id);
            if (playdatesToReturn != null)
            {
                return Ok(playdatesToReturn);
            }
            else
            {
                return NotFound();
            }
        }

    }

}