#pragma strict

private var player : Transform;
public var posY : float = 2.0;
public var despX: float = 2.0;

function Start () {
	player = GameObject.Find("Player").transform;
	transform.position.y = posY;
}

function Update () {
	transform.position = player.position - Vector3(0.0f,0.0f, 5.0f);
	
}
