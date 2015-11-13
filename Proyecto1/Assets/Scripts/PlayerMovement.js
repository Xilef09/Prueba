#pragma strict

private var cam : Transform;

function Start () {
	cam = GameObject.Find("Main Camera").transform;
}

function Update () {
	if (cam.position.y - transform.position.y > 8.0f) {
		Application.LoadLevel(Application.loadedLevel);
	}
}

function FixedUpdate () {
	GetComponent<Rigidbody2D>().AddForce(-Vector2.right*speed);
}