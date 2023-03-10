class MessagesController < ApplicationController
  def create
    @message = Message.new(set_params)
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message.chatroom = @chatroom
    @message.user = current_user

    if @message.save
      ChatroomChannel.broadcast_to(
        @chatroom,
        # "Yeah!"
        render_to_string(partial: "message", locals: { message: @message })
      )
      head :ok
    else
      render "chatroom/show", status: :unprocessable_entity
    end
  end

  private

  def set_params
    params.require(:message).permit(:content)
  end
end
