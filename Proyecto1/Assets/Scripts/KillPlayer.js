#pragma strict

private var anim:Animator;
private var collisioned : boolean = false;
private var time : float = 0.0;
private var durationVelocity : float = 0.5;
private var durationSize : float = 3.0;

function Start () {
	anim = GetComponent.<Animator>();
	
}

function FixedUpdate (){
		time+=Time.deltaTime;
		
		if (collisioned && time>durationVelocity){
			 //Debug.Log(GetComponent.<Rigidbody2D>().velocity);
			 GetComponent.<Rigidbody2D>().velocity=GetComponent.<Rigidbody2D>().velocity/1.5;
			 //Debug.Log(GetComponent.<Rigidbody2D>().velocity);
			 time = 0.0;
		}
		if (collisioned)
			sizeChanger();
}

function OnCollisionEnter2D (hit : Collision2D) {
	if (hit.gameObject.tag == "Player") {
		//GameObject.Find("Config").SendMessage("GetPickUp"); Para sumar los puntos en un FUTURO
		//yield WaitForSeconds(2); // no usar el yiel en funciones update
		//Debug.Log("Capturado!!!!!!!!!");
		
		anim.SetBool("PlayerFound", true);
		GetComponent.<Rigidbody2D>().gravityScale=0.0;
		collisioned = true;
		GetComponent.<Rigidbody2D>().velocity=GetComponent.<Rigidbody2D>().velocity/2;
		yield WaitForSeconds(5);
		//anim.SetBool("PlayerFound", false);		
		Application.LoadLevel(Application.loadedLevel);
	}

}
function sizeChanger(){
	transform.localScale+=Vector3(Time.deltaTime/durationSize,Time.deltaTime/durationSize,Time.deltaTime/durationSize);
}
