from drawdef import *

width = 20
current_position = [200,3950]
mouse_click_position = [200,3950]
mouse_click_real_position = []


pygame.init()

current_time = datetime.now()
# print(str(current_time)[:-10])


count = 500
coin_last_data =pyupbit.get_ohlcv(ticker=ticker,interval=interval,count=500)
coin_last_data = coin_to_list(coin_last_data.to_dict())
print(coin_last_data)

multiple = 1
print(len(coin_last_data))
current_position = [-1100 , 1900]
# print(current_position)
num = 0
chang_width_mode = 0
stack = 0
run = True





while run:
    print(current_position)
    myp =pygame.mouse.get_pos()
    for event in pygame.event.get():
        if (event.type == pygame.KEYDOWN):
            if (event.key == pygame.K_LCTRL):
                chang_width_mode = 1
        if (event.type == pygame.KEYUP):
            if (event.key == pygame.K_LCTRL):
                chang_width_mode = 0
        if event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 1:
                if num == 0:
                    mouse_click_position = myp
                    mouse_click_real_position = current_position
                    num = 1
            if event.button == 4:
                if (chang_width_mode == 0):
                    multiple += 0.1
                else:
                    width += 1
            elif event.button == 5:
                if (chang_width_mode == 0):
                    multiple -= 0.1
                else:
                    width -= 1
        if event.type == pygame.MOUSEMOTION:
            
            if num == 1:
                current_position = [mouse_click_real_position[0] - (mouse_click_position[0]-myp[0]),mouse_click_real_position[1] - (mouse_click_position[1] - myp[1])/multiple]
                
        if event.type == pygame.MOUSEBUTTONUP:
            if event.button == 1:
                if num == 1:
                    num = 0
        
            
        if event.type == pygame.QUIT:
            run = False
    # print(multiple)
    current_time = datetime.now()

    GameDisplay.fill((255,255,255))
    xpos = current_position[0]+1200
    # print(xpos)
    if (xpos < 0):
        xpos = 0
    
    
    if stack == 10:
        # time = datetime.now()
        count = 500
        
        coin_last_data =pyupbit.get_ohlcv(ticker=ticker,interval=interval,count=500,period=0.00001)
        # print(datetime.now()-time)

        coin_last_data = coin_to_list(coin_last_data.to_dict())

        stack = 0
        
    else:
        stack += 1
    max = 0
    for i in range(500):
        
        if(-20<current_position[0]+1200-i*width-width and current_position[0]+1200-i*width-width < 1220):
            if (max < coin_last_data[count-i-1][5]):
                max = coin_last_data[count-i-1][5]

    for i in range(500):
        
        if(-20<current_position[0]+1200-i*width-width and current_position[0]+1200-i*width-width < 1220):
            # print((current_position[0]+1200-i*width-width,current_position[1]))
            drawbar(coin_last_data[count-i-1],(current_position[0]+1200-i*width-width,current_position[1]),width,100/max,multiple=multiple)
    
    FramePerSec.tick(FPS)
    drawnum(current_position,multiple)
    pygame.display.update()
pygame.quit()
sys.exit()