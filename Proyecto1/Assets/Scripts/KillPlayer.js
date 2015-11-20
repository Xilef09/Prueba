#pragma strict

private var anim:Animator;

function Start () {
	anim = GetComponent.<Animator>();
	
}

function OnTriggerEnter2D (hit : Collider2D) {
	if (hit.gameObject.tag == "Player") {
		//GameObject.Find("Config").SendMessage("GetPickUp"); Para sumar los puntos en un FUTURO
		//yield WaitForSeconds(2); // no usar el yiel en funciones update
		//Debug.Log("Capturado!!!!!!!!!");
		
		anim.SetBool("PlayerFound", true);
		yield WaitForSeconds(1);
		//anim.SetBool("PlayerFound", false);
		
		Application.LoadLevel(Application.loadedLevel);
	}
}
