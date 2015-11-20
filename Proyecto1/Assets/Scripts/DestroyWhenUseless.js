#pragma strict
private var cam : Transform;

function Start () {
	cam = GameObject.Find("Main Camera").transform;
}

function Update () {
	if (cam.position.x < gameObject.transform.position.x-90.0f)
		Destroy(gameObject, 0.0f);
}