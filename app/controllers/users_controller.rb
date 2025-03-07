class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render 'users/create'
    else
      render json: {
        success: false
      }
    end
  end

  def list
    @users = User.all
    render 'users/index'
  end
  
  private

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end
end
