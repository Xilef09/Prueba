#pragma strict


private var cam : Transform;
public var groundPrefab : GameObject;
public var berriePrefab : GameObject;
public var pokeballPrefab : GameObject;
private var newRotation : Quaternion;
private var newPosition : Vector3;
public var lastPlatform : Transform;
public var oneTolastPlatform :Transform;

private var startVector : Vector3;
private var platVector : Vector3;
private var ScInitialPosition : float;

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
			inicializePlatforms(getEndXofPlat(lastPlatform),getEndYofPlat(lastPlatform),getEndXofPlat(oneTolastPlatform),getEndYofPlat(oneTolastPlatform));
			createNewBerries();	
			createNewPokeballs();		
	}
}

function inicializePlatforms(LeftDownX : float , LeftDownY: float, RightDownX: float, RightDownY: float) {
	startVector = Vector3(RightDownX, RightDownY, 0);
	platVector = Vector3(LeftDownX-RightDownX,LeftDownY-RightDownY,0);
}


function createNewPokeballs() {
	ScInitialPosition = Random.Range(0.0,1.0);
	
	var newPos : Vector3 = startVector+platVector*ScInitialPosition;
	var offset : float = Random.Range(1.0,14.0);
	newPos.y+=offset;
	var newRot : Quaternion = Quaternion.identity;
	var numPokeballs : int = Random.Range(0,5);
	
	switch(numPokeballs) {
		case 0:
			break;
		case 1:
			Instantiate(pokeballPrefab, newPos, newRot);
			break;
		case 2: 
			break;
		case 3:
			Instantiate(pokeballPrefab, newPos, newRot);
			break;
		case 4: 
			break;	
	}
}


function createNewBerries(){

	ScInitialPosition = Random.Range(0.0,1.0);
	var newPos : Vector3 = startVector+platVector*ScInitialPosition;
	var offset : float = Random.Range(1.0,14.0);
	newPos.y+=offset;
	var newRot : Quaternion = Quaternion.identity;
	
	var numBerries : int = Random.Range(0,5);
	switch(numBerries){
		case 0:
			break;
		case 1:
			Instantiate (berriePrefab, newPos,  newRot);
			break;
		case 2:
			Instantiate (berriePrefab, newPos,  newRot);
			if(ScInitialPosition>5.0)
				Instantiate (berriePrefab, newPos+Vector3(1.5,0,0),  newRot);
			else Instantiate (berriePrefab, newPos+Vector3(-1.5,0,0),  newRot);
			break;
		case 3:
			Instantiate (berriePrefab, newPos,  newRot);
			if(ScInitialPosition>5.0){
				Instantiate (berriePrefab, newPos+Vector3(1.5,0,0),  newRot);
				if(offset>7.0) Instantiate (berriePrefab, newPos+Vector3(0.75,-1.5,0),  newRot);
				else Instantiate (berriePrefab, newPos+Vector3(0.75,1.5,0),  newRot);
			}
			else{
				Instantiate (berriePrefab, newPos+Vector3(-1.5,0,0),  newRot);
				if(offset>7.0) Instantiate (berriePrefab, newPos+Vector3(-0.75,-1.5,0),  newRot);
				else Instantiate (berriePrefab, newPos+Vector3(-0.75,1.5,0),  newRot);
			}
		case 4:
			Instantiate (berriePrefab, newPos,  newRot);
			if(ScInitialPosition>5.0){
				Instantiate (berriePrefab, newPos+Vector3(1.5,0,0),  newRot);
				if(offset>7.0){
					Instantiate (berriePrefab, newPos+Vector3(0,-1.5,0),  newRot);
					Instantiate (berriePrefab, newPos+Vector3(1.5,-1.5,0),  newRot);
					}
				else{
					Instantiate (berriePrefab, newPos+Vector3(0,1.5,0),  newRot);
					Instantiate (berriePrefab, newPos+Vector3(1.5,1.5,0),  newRot);
				}
			}
			else{
				Instantiate (berriePrefab, newPos+Vector3(-1.5,0,0),  newRot);
				if(offset>7.0){
					Instantiate (berriePrefab, newPos+Vector3(0,-1.5,0),  newRot);
					Instantiate (berriePrefab, newPos+Vector3(-1.5,-1.5,0),  newRot);
					}
				else{
					Instantiate (berriePrefab, newPos+Vector3(0,1.5,0),  newRot);
					Instantiate (berriePrefab, newPos+Vector3(-1.5,1.5,0),  newRot);
				}
			}	
	}
}

function getNewX(start : float){
	return (start - Mathf.Abs(Mathf.Cos(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
}

function getNewY(start : float){
	if(newRotation.eulerAngles.z>=180) return(start+ Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
	else return(start - Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2));
}

function getEndXofPlat(plat : Transform){
	return plat.position.x - Mathf.Abs(Mathf.Cos(plat.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
}

function getEndYofPlat(plat : Transform){
	var ini : float;
	if(plat.rotation.eulerAngles.z>=180) return plat.position.y+Mathf.Abs(Mathf.Sin(plat.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
	else return plat.position.y-Mathf.Abs(Mathf.Sin(plat.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);	
}

function getNewRandomRotation(){
	newRotation = Quaternion.identity;
	newRotation.eulerAngles.z =Random.Range(-30.0,30.0);
}