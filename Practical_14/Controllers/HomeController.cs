using Practical_14.Models;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web.Mvc;

namespace Practical_14.Controllers
{
	public class HomeController : Controller
	{
		Default db = new Default();

		public ActionResult Index()
		{

			return View(db.employees.OrderBy(x => x.Id).Take(10));
		}

		public ActionResult Create()
		{
			return View(new employee());
		}

		[HttpPost]
		public ActionResult Create(employee employee)
		{
			db.employees.Add(employee);
			db.SaveChanges();
			return RedirectToAction("Index");
		}

		public ActionResult Delete(int? id)
		{
			if (id == null)
			{
				return View("Error");
			}

			var user = db.employees.Find(id);

			if (user == null)
			{
				return View("Error");
			}

			return View(user);
		}

		[HttpPost]
		public ActionResult Delete(employee employee)
		{
			db.Entry(employee).State = System.Data.Entity.EntityState.Deleted;
			//db.employees.Remove(employee);
			db.SaveChanges();
			return RedirectToAction("Index");
		}

		public ActionResult Edit(int? id)
		{
			if (id == null)
			{
				return View("Error");
			}

			var user = db.employees.Find(id);

			if (user == null)
			{
				return View("Error");
			}

			return View(user);
		}

		[HttpPost]
		public ActionResult Edit(employee employee)
		{
			db.employees.AddOrUpdate(employee);
			db.SaveChanges();
			return RedirectToAction("Index");
		}

		public ActionResult Details(int? id)
		{
			if (id == null)
			{
				return View("Error");
			}

			var user = db.employees.Find(id);

			if (user == null)
			{
				return View("Error");
			}

			return View(user);
		}


		public JsonResult GetDate(string SearchString, int pageNo)
		{
			if (SearchString == null)
			{
				return Json(db.employees.OrderBy(x => x.Id).Skip((pageNo - 1) * 10).Take(10), JsonRequestBehavior.AllowGet);
			}

			var employees = db.employees.Where(x => x.Name.Contains(SearchString)).OrderBy(x => x.Id).Skip((pageNo - 1) * 10).Take(10);

			return Json(employees, JsonRequestBehavior.AllowGet);

		}

	}
}