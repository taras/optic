package com.opticdev.server.http.routes.socket.agents

import akka.actor.{Actor, ActorRef, Status}
import com.opticdev.server.http.routes.socket.{ContextFound, ErrorResponse}
import com.opticdev.server.http.routes.socket.agents.Protocol._
import com.opticdev.server.state.ProjectsManager

class AgentConnectionActor(slug: String, projectsManager: ProjectsManager) extends Actor {

  private var connection : ActorRef = null

  private var name : String = slug
  private var version : String = ""

  override def receive: Receive = {
    case Registered(actorRef) => {
      println("worked correctly")
      connection = actorRef
    }
    case Terminated => {
      Status.Success(Unit)
      AgentConnection.killAgent(slug)
    }

    case UnknownEvent(raw) => {
      connection ! ErrorResponse("Invalid Request")
    }


    case update: ContextFound => {
      connection ! update
    }

  }

}
