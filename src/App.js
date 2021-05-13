import React,{Fragment,useState} from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import './App.css';

var moment = require('moment-timezone');
var timeZones = moment.tz.names();

function App() {

  const [DateStatus,SetDateStatus] = useState(true);
  const [formateChange,setformateChange] = useState(true);
  const [fromtimeZone,setFromTimeZone] = useState(timeZones[282]);
  const [totimeZone,setToTimeZone] = useState(timeZones[451]);
  const [fromtime,setfromTime] = useState(moment.tz(moment(), timeZones[282]).format('hh:mm a'));
  const [totime,settoTime] = useState(moment.tz(moment(), timeZones[451]).format('hh:mm a'));

  var todayDate = new Date();
  var dd = String(todayDate.getDate()).padStart(2, '0');
  var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); 
  var yyyy = todayDate.getFullYear();
  todayDate = dd + '/' + mm + '/' + yyyy;

  function setFromTime(val){
    setFromTimeZone(val);
    var t1 = moment.tz(totime,'h:mm A',totimeZone);
    
    if(val !== "")
    {
      if(formateChange){
        setfromTime(t1.clone().tz(val).format('h:mm A'));
      }
      else{
        setfromTime(t1.clone().tz(val).format('HH:mm'));
      }
      
    }
  } 

  function setToTime(val){
    setToTimeZone(val);
    var t2 = moment.tz(fromtime,'h:mm A',fromtimeZone);
    
    if(val !== "")
    {
      if(formateChange)
      {
        settoTime(t2.clone().tz(val).format('h:mm A'));
      }
      else{
        settoTime(t2.clone().tz(val).format('HH:mm'));
      }      
    }
  }

  function formatechange(checked){
    setformateChange(checked);
    if(!checked)
    {
      setfromTime(moment(fromtime,'h:mm A').format('HH:mm'));
      settoTime(moment(totime,'h:mm A').format('HH:mm'));
    }
    else{
      setfromTime(moment(fromtime,'HH:mm').format('h:mm A'));
      settoTime(moment(totime,'HH:mm').format('h:mm A'));
    }
  }

  return (
    <Fragment>
    <h1 className="text-center mb-4" style={{color:'whitesmoke',marginTop:'10%'}}>Time Zone Converter</h1>
    <div className="container">
    <label style={{marginRight:'10px',marginLeft:'370px',fontWeight:'bold',color:'whitesmoke'}}>Date Display :</label>
    <BootstrapSwitchButton checked={DateStatus} size="sm" offstyle="danger" onChange={checked=>SetDateStatus(checked)} />

  <label style={{marginLeft:'30px',marginRight:'10px',fontWeight:'bold',color:'whitesmoke'}}>Time format : </label>
  <BootstrapSwitchButton checked={formateChange} size="sm" height="20px" onlabel="12" offlabel="24" offstyle="success" onstyle="primary" onChange={checked=>formatechange(checked)}/><hr/>
    <div className="row">
    <div className="col-md">
    <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default" >Enter Time</span>
    </div>
    <input type="text" style={{width:'200px',}} class="form-control" value={fromtime}  onChange={e=>setfromTime(e.target.value)}  aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
  </div>

  <div>{
    DateStatus && <div class="input-group mb-3">
    <div class="input-group-prepend" >
      <span class="input-group-text" id="inputGroup-sizing-default">Enter Date</span>
    </div>
    <input type="text" class="form-control" value={todayDate} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
    </div>
  } 
  </div>

  <input type="text" class="form-control" list="zones" value={fromtimeZone}  onChange= {e => setFromTime(e.target.value)} />
    <datalist id="zones">
    {timeZones.map((timezone) => <option value={timezone}>{timezone}</option>)}
    </datalist>
  <hr/>
    </div>

    <div className="col-md">
    <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default">Enter Time</span>
    </div>
    <input type="text" style={{width:'200px',}} class="form-control" value={totime} onChange={e=>settoTime(e.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
  </div>

  <div>{
    DateStatus && <div class="input-group mb-3">
    <div class="input-group-prepend" >
      <span class="input-group-text" id="inputGroup-sizing-default">Enter Date</span>
    </div>
    <input type="text" class="form-control" value={todayDate} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
    </div>
  } 
  </div>

  
  <input type="text" class="form-control" list="rzones" value={totimeZone}  onChange={e =>setToTime(e.target.value)} />
    <datalist id="rzones">
    {timeZones.map((timezone) => <option value={timezone}>{timezone}</option>)}
    </datalist>
    <hr/>

    </div>    
    </div>
</div>
</Fragment>
  );
}

export default App;
