class MessagesController < ApplicationController
  def create
    @message = Message.new(set_params)
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message.chatroom = @chatroom
    @message.user = current_user

    if @message.save
      redirect_to chatroom_path(@chatroom)
    else
      render "chatroom/show"
    end
  end

  private

  def set_params
    params.require(:message).permit(:content)
  end
end