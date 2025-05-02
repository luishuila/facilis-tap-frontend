import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: false,
})
export class EmployeeListComponent  implements OnInit {
  employeeList:any[] = [];
  constructor(private employeeService:EmployeeService,    private router: Router) { 
    this.employeeService.findOneAll().subscribe(data=>this.employeeList = data)
  }

  ngOnInit() {}
  url(id:number|null){
    const url:string = 'navigation/employee-information';
    if(id != null){
      this.router.navigate([`${url}/${id}`]); 
    }else{
      this.router.navigate([`${url}`]); 
    }
    
  }
 
}
