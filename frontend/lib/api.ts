const BASE = "http://localhost:8080/api";


export const api = {
getEmployees: () => fetch(`${BASE}/employees`).then(r => r.json()),
addEmployee: (data: any) => fetch(`${BASE}/employees`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)}),
updateEmployee: (id:number,data:any)=> fetch(`${BASE}/employees/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}),
deleteEmployee: (id:number)=> fetch(`${BASE}/employees/${id}`,{method:"DELETE"}),


getVehicles: () => fetch(`${BASE}/vehicles`).then(r => r.json()),
addVehicle: (data:any)=> fetch(`${BASE}/vehicles`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}),
updateVehicle: (id:number,data:any)=> fetch(`${BASE}/vehicles/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}),
deleteVehicle: (id:number)=> fetch(`${BASE}/vehicles/${id}`,{method:"DELETE"}),
}