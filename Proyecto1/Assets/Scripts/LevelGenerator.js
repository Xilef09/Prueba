#pragma strict
private var cam : Transform;
public var groundPrefab : GameObject;
public var berriePrefab : GameObject;
private var newRotation : Quaternion;
private var newPosition : Vector3;
public var lastPlatform : Transform;
public var oneTolastPlatform :Transform;

function Start () {
	cam = GameObject.Find("Main Camera").transform;
	//player = GameObject.FindbyTag("Player");
}

function Update () {
	if (cam.position.x < lastPlatform.position.x+90.0f){
			getNewRandomRotation();
			var iniX : float = getEndXofPlat(lastPlatform);
			var iniY : float = getEndYofPlat(lastPlatform);
			newPosition.x = getNewX(iniX);
			newPosition.y = getNewY(iniY);
			newPosition.z=0;
			oneTolastPlatform = lastPlatform;
			lastPlatform =Instantiate(groundPrefab, newPosition, newRotation).transform;
			Instantiate(groundPrefab, newPosition+Vector3(0,15,0), newRotation);
			createNewBerries(getEndXofPlat(lastPlatform),getEndYofPlat(lastPlatform),getEndXofPlat(oneTolastPlatform),getEndYofPlat(oneTolastPlatform));
	}

}


function createNewBerries(LeftDownX : float , LeftDownY: float, RightDownX: float, RightDownY: float){

	var ScInitialPosition : float = Random.Range(0.0,1.0);
	var startVec : Vector3 = Vector3(RightDownX, RightDownY, 0);
	var platVec : Vector3 = Vector3(LeftDownX-RightDownX,LeftDownY-RightDownY,0);
	var newPos : Vector3 = startVec+platVec*ScInitialPosition;
	newPos.y+=Random.Range(1.0,14.0);
	var newRot : Quaternion = Quaternion.identity;
	Instantiate (berriePrefab, newPos,  newRot);
	
	
	
}

function getNewX(start : float){
	return (start - Mathf.Abs(Mathf.Cos(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
}
function getNewY(start : float){
	if(newRotation.eulerAngles.z>180) return(start+ Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
	else if(newRotation.eulerAngles.z<180) return(start - Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
}
function getEndXofPlat(plat : Transform){
	return plat.position.x - Mathf.Abs(Mathf.Cos(plat.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
}

function getEndYofPlat(plat : Transform){
	var ini : float;
	if(plat.rotation.eulerAngles.z>180) return plat.position.y+Mathf.Abs(Mathf.Sin(plat.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
	else if(plat.rotation.eulerAngles.z<180) return plat.position.y-Mathf.Abs(Mathf.Sin(plat.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);	
}
function getNewRandomRotation(){
	newRotation = Quaternion.identity;
	newRotation.eulerAngles.z =Random.Range(-40.0,40.0);
}