defmodule RoomWeb.UserSocket do
  use Phoenix.Socket

  # listen to topic:subtopic
  # pointing to the `RoomWeb.RoomChannel`:
  channel("room:*", RoomWeb.RoomChannel)

  @impl true
  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  # anonymous socket
  @impl true
  def id(_socket), do: nil
end
