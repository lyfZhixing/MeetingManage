package com.zzuli.controler;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.zzuli.entity.Department;
import com.zzuli.service.DepartmentService;
import com.zzuli.service.implement.DepartmentServiceImplement;

/**
 * Servlet implementation class UpdateDepartmentServlet
 */
public class UpdateDepartmentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateDepartmentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		String newdname = request.getParameter("newdname");
		String didstr = request.getParameter("did");
		int did = 0;
		if(didstr != null && !didstr.equals("")){
			did = Integer.parseInt(didstr);
			DepartmentService ds = new DepartmentServiceImplement();
			Department department = new Department(did,newdname);
			int result = 0;
			try {
				PrintWriter out = response.getWriter();
				String json = null;
				result = ds.updateDepartment(department);
				if(result != 0){
					department = ds.queryDepartment(did);
					json = JSON.toJSONString(department);
					out.print(json);
					out.flush();
					out.close();
				}else{
					json = "this is not a json obj";
					out.print(json);
					out.flush();
					out.close();
				}

				
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
	}

}
