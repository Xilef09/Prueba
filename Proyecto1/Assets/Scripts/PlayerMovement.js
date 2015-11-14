#pragma strict


public var jumpspeed : float = 150;
public var speed : float = 2.0;
public var maxSpeed : float = 15.0;
public var reduction : float = 1.5;

private var floor: GameObject;
private var cam : Transform;
private var jumpClicked : boolean = false;
private var actualJumpSpeed : float = 0.0;


function Start () {
	cam = GameObject.Find("Main Camera").transform;
}

function Update () {
	/*
	//Para probar sin el suelo
	if (cam.position.y - transform.position.y > 8.0f) {
		Application.LoadLevel(Application.loadedLevel);
	}
	*/
}

function FixedUpdate () {
	GetComponent.<Rigidbody2D>().AddForce(-Vector2.right*speed);
	
	if (GetComponent.<Rigidbody2D>().velocity.x >= maxSpeed) {
		GetComponent.<Rigidbody2D>().velocity.x = maxSpeed;
	}
	
	if (Input.GetButton("Jump")) {
		jumpClicked = true;
		actualJumpSpeed = jumpspeed;
		
		GetComponent.<Rigidbody2D>().AddForce(Vector2.up*actualJumpSpeed);
		actualJumpSpeed -= reduction;
	
		if (jumpClicked) {
			jumpClicked = false;
			actualJumpSpeed = 0;
			if (GetComponent.<Rigidbody2D>().velocity.y > 0 ) {
				GetComponent.<Rigidbody2D>().velocity.y  = 1.0f;
			}
		}
	}
}
