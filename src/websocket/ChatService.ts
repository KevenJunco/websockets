import { container } from 'tsyringe';
import {io} from '../http'
import { CreateUserService } from '../services/CreateUserService';
import { GetAllUsersSerive } from '../services/GetAllUsersService';

io.on("connect", socket => {
    socket.emit("chat_iniciado", {
        message: "Seu chat foi iniciado"
    });

    socket.on("start", async (data)  => {
        const {email, avatar, name} = data


        const createUserUseService = container.resolve(CreateUserService);

        const user = await createUserUseService.execute({
            email,
            avatar,
            name,
            socket_id: socket.id
        })

        socket.broadcast.emit("new_users", user)

    })

    socket.on("get_users", async (callback) => {
        const getAllUsersSerive = container.resolve(GetAllUsersSerive);

        const users = await getAllUsersSerive.execute();

        callback(users);

    })

})