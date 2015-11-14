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
	if (cam.position.x < lastPlatform.position.x-50.0f){
			//Debug.Log("vecevececvec"+ lastPlatform.rotation.z);
			newRotation = Quaternion.identity;
			newRotation.eulerAngles.z =Random.Range(-60.0,60.0);
			var iniX : float = lastPlatform.position.x - Mathf.Abs(Mathf.Cos(lastPlatform.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
			//Debug.Log("suma de x:  " + Mathf.Cos(Mathf.Deg2Rad(lastPlatform.eulerAngles.z)));
			Debug.Log("finalterra:  " + iniX);
			var iniY : float;
			if(newRotation.eulerAngles.z>180) iniY  = lastPlatform.position.y+Mathf.Abs(Mathf.Sin(lastPlatform.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
			else if(newRotation.eulerAngles.z<180) iniY = lastPlatform.position.y-Mathf.Abs(Mathf.Sin(lastPlatform.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
			newPosition.x = iniX - Mathf.Abs(Mathf.Cos(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
			//Debug.Log("cos de:  " +newRotation.eulerAngles.z+ " es: "  + Mathf.Cos(newRotation.eulerAngles.z));
			Debug.Log("nouterra:  " + newPosition.x);
			if(newRotation.eulerAngles.z>180) newPosition.y = iniY+ Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
			else if(newRotation.eulerAngles.z<180) newPosition.y = iniY- Mathf.Abs(Mathf.Sin(newRotation.eulerAngles.z*Mathf.Deg2Rad)*groundPrefab.transform.localScale.x/2);
			newPosition.z=0;
			lastPlatform =Instantiate(groundPrefab, newPosition, newRotation).transform;
	}
	//Debug.Log("cam position: " + cam.position.x + "lastPlat position: " + lastPlatform.position.x);
}