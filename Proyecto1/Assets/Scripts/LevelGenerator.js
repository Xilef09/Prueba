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
	if (cam.position.x < lastPlatform.position.x-20.0f){
			newRotation = Quaternion.identity;
			newRotation.z = newRotation.z+Random.Range(-60.0,60.0);
			var iniX : float = lastPlatform.position.x -Mathf.Cos(lastPlatform.rotation.z)/2;
			var iniY : float = lastPlatform.position.y+Mathf.Sin(lastPlatform.rotation.z)/2;
			newPosition.x = iniX - Mathf.Cos(newRotation.z)/2;
			newPosition.y = iniY+ Mathf.Sin(newRotation.z)/2;
			newPosition.z=0;
			lastPlatform =Instantiate(groundPrefab, newPosition, newRotation).transform;
	}
}