#pragma strict

private var player : Transform;
public var posY : float = 2.0;
public var despX: float = 2.0;

function Start () {
	player = GameObject.Find("Player").transform;
	transform.position.y = posY;
	Debug.Log(transform.position);
}

function Update () {
	transform.position = player.position - Vector3(despX, posY-player.position.y, -5.0f);
	
}
