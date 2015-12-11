#pragma strict

function OnTriggerEnter2D (hit : Collider2D) {
	if (hit.gameObject.tag == "Player") {
		//GameObject.Find("Config").SendMessage("GetPickUp"); Para sumar los puntos en un FUTURO
		//yield WaitForSeconds(2); // no usar el yiel en funciones update
		//Debug.Log(1);
		Destroy(gameObject);
	}
}
