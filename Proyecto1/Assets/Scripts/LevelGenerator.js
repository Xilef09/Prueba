#pragma strict
private var cam : Transform;
var groundPrefab : GameObject;
private var newRotation : Quaternion;
private var newPosition : Vector3;
public var lastPlatform : Transform;

function Start () {
	cam = GameObject.Find("Main Camera").transform;
	//player = GameObject.FindbyTag("Player");
}

function Update () {
	if (cam.position.x < lastPlatform.position.x+90.0f){
			getNewRandomRotation();
			var iniX : float = getEndXofLastPlat();
			var iniY : float = getEndYofLastPlat();
			newPosition.x = getNewX(iniX);
			newPosition.y = getNewY(iniY);
			newPosition.z=0;
			lastPlatform =Instantiate(groundPrefab, newPosition, newRotation).transform;
			//newPosition.y+=15;
			Instantiate(groundPrefab, newPosition+Vector3(0,15,0), newRotation);
	}
//Debug.Log("cam position: " + cam.position.x + "lastPlat position: " + lastPlatform.position.x);
}
function getNewX(start : float){
	return (start - Mathf.Abs(Mathf.Cos(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
}
function getNewY(start : float){
	if(newRotation.eulerAngles.z>180) return(start+ Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
	else if(newRotation.eulerAngles.z<180) return(start - Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
}
function getEndXofLastPlat(){
	return lastPlatform.position.x - Mathf.Abs(Mathf.Cos(lastPlatform.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
}

function getEndYofLastPlat(){
	var ini : float;
	if(lastPlatform.rotation.eulerAngles.z>180) return lastPlatform.position.y+Mathf.Abs(Mathf.Sin(lastPlatform.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
	else if(lastPlatform.rotation.eulerAngles.z<180) return lastPlatform.position.y-Mathf.Abs(Mathf.Sin(lastPlatform.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);	
}
function getNewRandomRotation(){
	newRotation = Quaternion.identity;
	newRotation.eulerAngles.z =Random.Range(-40.0,40.0);
}