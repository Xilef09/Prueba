#pragma strict


public var jumpspeed : float = 150;
public var speed : float = 2.0;
public var maxSpeed : float = 15.0;
public var reduction : float = 1.5;

private var floor: GameObject;
private var cam : Transform;
private var jumpClicked : boolean = false;
private var actualJumpSpeed : float = 0.0;
private var capturing : boolean = false;
private var t : float = 0.0;
private var duration : float = 4.0;


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
	GetComponent.<Rigidbody2D>().AddForce(-Vector2.right*speed/2);
	
	if (GetComponent.<Rigidbody2D>().velocity.x >= maxSpeed) {
		GetComponent.<Rigidbody2D>().velocity.x = maxSpeed;
	}
	if(capturing){
		colorChanger();
		sizeChanger();
		GetComponent.<Rigidbody2D>().gravityScale=0.0;
		GetComponent.<Rigidbody2D>().velocity.y =0.0;
		GetComponent.<Rigidbody2D>().velocity.x =0.0;
	}
	else if (Input.GetButton("Jump")) {
		jumpClicked = true;
		actualJumpSpeed += jumpspeed;
		
		GetComponent.<Rigidbody2D>().AddForce(Vector2.up*actualJumpSpeed/2);
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

function colorChanger(){
	GetComponent.<Renderer>().material.color= Color.Lerp(GetComponent.<Renderer>().material.color, Color.red, t);
	t+=Time.deltaTime/duration;

}
function sizeChanger(){
	transform.localScale-=Vector3(Time.deltaTime/duration,Time.deltaTime/duration,Time.deltaTime/duration);
	
}

function OnCollisionEnter2D (hit : Collision2D) {
	if (hit.gameObject.tag == "Floor") {
			Application.LoadLevel(Application.loadedLevel);
	}
	if (hit.gameObject.tag == "Pokeball"){
			Debug.Log("HOLA");
			capturing = true;
	}
}
